from oauth2_provider.models import get_access_token_model, get_refresh_token_model
from oauth2_provider.settings import oauth2_settings
from oauthlib.common import generate_token
from django.utils import timezone
from datetime import timedelta

from oauth2_provider.models import Application


def create_token_response(request, user):
    token = generate_token()

    AccessToken = get_access_token_model()
    RefreshToken = get_refresh_token_model()

    expires = timezone.now() + timedelta(seconds=oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS)

    access_token = AccessToken.objects.create(user=user,
                                              token=token,
                                              expires=expires,
                                              scope='',
                                              application=None, )

    refresh_token = generate_token()

    application = Application.objects.first()

    refresh_token_obj = RefreshToken.objects.create(user=user,
                                                    token=refresh_token,
                                                    access_token=access_token,
                                                    application=application, )

    response_data = {
        "access_token": token,
        "expires_in": oauth2_settings.ACCESS_TOKEN_EXPIRE_SECONDS,
        "token_type": "Bearer",
        "scope": access_token.scope,
        "refresh_token": refresh_token,
    }

    return response_data
