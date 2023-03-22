from odoo import models, fields

class CustomTableData(models.Model):
    _name = 'custom.table.data'
    _description = 'Custom Table Data'

    data = fields.Text(string='Table Data')
    website_id = fields.Many2one('website', string='Website', required=True)
