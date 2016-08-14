from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Field
from crispy_forms.bootstrap import (
    PrependedText, PrependedAppendedText, FormActions)


class NewSQLSourceForm(forms.Form):
    CONNECTION_TYPES = (
        ('PostgreSQL >= 7.4', 'postgres'),
        ('Oracle > 11g', 'oracle')
    )
    connection_type = forms.CharField(
        max_length=30,
        widget=forms.Select(choices=CONNECTION_TYPES),
    )
    host = forms.CharField(max_length=60, required=True)
    port = forms.IntegerField()
    db_name = forms.CharField(max_length=60, required=True)
    password = forms.CharField(max_length=60, required=True, widget=forms.PasswordInput)

    helper = FormHelper()
    helper.form_method = 'POST'


