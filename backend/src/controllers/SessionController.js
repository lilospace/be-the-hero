const connection = require('../databases/connection');

module.exports = {
  async create(request, response) {

    const { id } = request.body;

    const ong = await connection('ongs').where('id', id).select('name').first();

    if (!ong) {
      return response.status(400).json({ erro: 'NOT FOUND ONG' })
    }
    return response.json(ong);
  }
}