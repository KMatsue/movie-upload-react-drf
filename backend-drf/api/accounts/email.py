from django.contrib.auth.tokens import default_token_generator
from djoser import utils
from templated_mail.mail import BaseEmailMessage
from django.conf import settings


class EmailManageer(BaseEmailMessage):
    def send(self, to, *args, **kwargs):
        self.render()
        self.to = to
        self.cc = kwargs.pop('cc', [])
        self.bcc = kwargs.pop('bcc', [])
        self.reply_to = kwargs.pop('reply_to', [])
        self.from_email = kwargs.pop('from_email',
                                     f'Video-UP <{settings.DEFAULT_FROM_EMAIL}>')
        super(BaseEmailMessage, self).send(*args, **kwargs)


class ActivationEmail(EmailManageer):
    template_name = 'accounts/activation.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        user = context.get('user')
        context['username'] = user.username
        context['uid'] = utils.encode_uid(user.pk)
        context['token'] = default_token_generator.make_token(user)
        context['url'] = settings.DJOSER['ACTIVATION_URL'].format(**context)
        return context
