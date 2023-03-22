{
    'name': 'Custom Table Snippet',
    'version': '1.0',
    'category': 'Website',
    'summary': 'A custom table snippet for Odoo 16 website',
    'author': 'Your Name',
    'website': 'https://www.example.com',
    'depends': ['website'],
    'data': [
        'views/snippets.xml',
    ],
    'web.assets_frontend': [
        "/custom_table_snippet/static/src/css/custom_table_snippet.css",
        "/custom_table_snippet/static/src/js/custom_table_snippet.js",

    ],
    'installable': True,
    'application': False,
}
