import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { PrivyClient } from '@privy-io/server-auth';

@Controller('auth')
export class AuthController {
  /**
   * OAuth redirect proxy for Chrome Extension
   * Receives Privy OAuth callback and redirects to Chrome extension
   * with all query parameters intact so Privy SDK can complete authentication
   */
  @Get('twitter/callback')
  @Redirect()
  twitterCallback(@Query() query: Record<string, string>) {
    // Get extension ID from environment variable
    const extensionId = process.env.CHROME_EXTENSION_ID;

    if (!extensionId) {
      throw new Error('Chrome Extension ID not configured');
    }

    // Build query string from all params received from Privy
    const params = new URLSearchParams(query).toString();

    // Redirect to Chrome extension popup with all query params
    const redirectUrl = `chrome-extension://${extensionId}/popup.html?${params}`;

    console.log(`Redirecting to Chrome extension: ${redirectUrl}`);

    return {
      url: redirectUrl,
      statusCode: 302,
    };
  }

  @Get('privy/callback')
  async privyCallback(@Query('access_token') accessToken: string) {
    const privy = new PrivyClient(
      process.env.PRIVY_APP_ID!,
      process.env.PRIVY_CLIENT_SECRET!,
    );

    const user = await privy.getUser({ idToken: accessToken });

    return {
      message: 'Privy callback received',
      user,
    };
  }
}
