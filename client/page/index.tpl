<!DOCTYPE html> {% html framework="home:static/js/mod.js" %} {% head %}
<title>Redux TodoMVC example</title>
{% endhead %} {%body%}
<div class="root" id="root">{{ssr|raw}}</div>
{% script %} require('./client.js'); {% endscript %} {% endbody %} {% endhtml %}