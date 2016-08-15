from django import forms
from crispy_forms.helper import FormHelper
from .models import SQLSource
from crispy_forms.layout import Submit, Layout, Field
from crispy_forms.bootstrap import (
    PrependedText, PrependedAppendedText, FormActions, StrictButton)


class NewSQLSourceForm(forms.ModelForm):
    CONNECTION_TYPES = (
        ('postgres', 'PostgreSQL >= 7.4'),
        ('oracle', 'Oracle > 11g')
    )
    connection_type = forms.CharField(
        max_length=30,
        widget=forms.Select(choices=CONNECTION_TYPES),
    )
    host = forms.CharField(max_length=60, required=True)
    port = forms.IntegerField(initial=5432)
    db_name = forms.CharField(max_length=60, required=True, label="Database Name")
    user_name = forms.CharField(max_length=60, required=True, label="Username")
    password = forms.CharField(max_length=60, required=True, widget=forms.PasswordInput)

    helper = FormHelper()
    helper.form_class = 'form-horizontal'
    helper.label_class = 'col-lg-5'
    helper.field_class = 'col-lg-7'
    helper.form_method = 'POST'

    class Meta:
        model = SQLSource
        fields = ['connection_type', 'host', 'db_name', 'user_name', 'password', 'port']
