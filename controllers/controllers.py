from odoo import http
from odoo.http import request

class CustomTableController(http.Controller):
    @http.route('/custom_table_snippet/save_data', type='json', auth='user', website=True)
    def save_data(self, table_data):
        website = request.website
        table_data_record = request.env['custom.table.data'].sudo().search([('website_id', '=', website.id)], limit=1)

        if table_data_record:
            table_data_record.write({'data': table_data})
        else:
            request.env['custom.table.data'].sudo().create({
                'data': table_data,
                'website_id': website.id,
            })

        return {'result': 'success'}

    @http.route('/custom_table_snippet/load_data', type='json', auth='user', website=True)
    def load_data(self):
        website = request.website
        table_data_record = request.env['custom.table.data'].sudo().search([('website_id', '=', website.id)], limit=1)

        if table_data_record:
            return {'table_data': table_data_record.data}
        else:
            return {'table_data': ''}
