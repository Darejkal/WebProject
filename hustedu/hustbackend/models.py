from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
class EduUserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school= models.TextField(_("School"))
    realname=models.TextField(_("Real Name"))
    email=models.EmailField(_("Email"), max_length=254)
