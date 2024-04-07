from django.contrib.auth.forms import AuthenticationForm,UserCreationForm
class SignInForm(AuthenticationForm):
    def Meta():
        fields=["username","password"]
class SignUpForm(UserCreationForm):
    def Meta():
        fields=["username","password1","password2"]