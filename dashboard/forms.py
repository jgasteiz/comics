from django import forms

from dashboard.models import APIToken, Series, Comic


class SeriesForm(forms.ModelForm):
    class Meta:
        fields = (
            'title',
            'author',
            'year',
        )
        model = Series


class ComicForm(forms.ModelForm):
    class Meta:
        fields = (
            'title',
        )
        model = Comic


class ComicUploadForm(forms.Form):
    file = forms.FileField()


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


class APITokenForm(forms.ModelForm):
    class Meta:
        fields = (
            'token',
            'description',
        )
        model = APIToken
