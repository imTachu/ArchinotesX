# -*- coding: utf-8 -*-
import psycopg2
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


from reference_architect.forms import NewSQLSourceForm


class AjaxableResponseMixin(object):
    """
    Mixin to add AJAX support to a form.
    Must be used with an object-based FormView (e.g. CreateView)
    """
    def form_invalid(self, form):
        response = super(AjaxableResponseMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response


def index(request):
    form = AuthenticationForm()
    return render(request, 'reference_architect/index.html', {'form': form})


@login_required
def overview(request):
    context = {
        'form': NewSQLSourceForm()
    }
    if request.POST:
        form = NewSQLSourceForm(request.POST)
        context['form'] = form
        if 'create' in request.POST:
            print 'entra a create'
            if form.is_valid():
                inmemory_form = form.save(commit=False)
                inmemory_form.company = request.user.userprofile.company
                inmemory_form.save()
            # return JsonResponse({'status':'false','message':'no'}, status=500)
        elif 'test' in request.POST:
            print 'entra a test'
            if form.is_valid():
                test_postgresql_connection(request)
                context['msg'] = 'conexion exitosa'
    return render(request, 'reference_architect/datasources.html', context)


@login_required
def test_postgresql_connection(request):
    try:
        conn_string = "host='" + request.POST.get('host') + "' dbname='" + request.POST.get(
            'db_name') + "' user='archinotesx' password='archinotesx'"
        print "Connecting to database\n	->%s" % conn_string
        connection = psycopg2.connect(conn_string)
        cursor = connection.cursor()
        cursor.execute("""SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'""")
        for table in cursor.fetchall():
            print(table)
    except:
        print "I am unable to connect to the database"
