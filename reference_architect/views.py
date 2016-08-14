from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from django.template import loader
from django.contrib.auth import authenticate, login, logout
from .models import Company,SQLSource
from django.contrib.auth.decorators import login_required
from django.template import RequestContext
import psycopg2
from reference_architect.forms import NewSQLSourceForm
from django.contrib.auth.forms import AuthenticationForm


def index(request):
    form = AuthenticationForm()
    return render(request, 'reference_architect/index.html', {'form': form})


@login_required
def overview(request):
    return render(request, 'reference_architect/datasources.html', {'form': NewSQLSourceForm()})


@login_required
def test_postgresql_connection(request):
    try:
        conn = psycopg2.connect("dbname='template1' user='dbuser' host='localhost' password='dbpass', port=5423")
    except:
        print "I am unable to connect to the database"

