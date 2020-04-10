const connection = require('../databases/connection');


module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*',
        'ongs.name',
        'ongs.whatsapp',
        'ongs.email',
        'ongs.city',
        'ongs.id',
        'ongs.uf'
      ])

    response.header('X-total-Count', count['count(*)']);
    return response.json({ incidents });
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents').where('id', id).select('ong_id').first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "operation not permitted" });
    }
    try {
      await connection('incidents').where('id', id).delete();
      return response.status(204).send();
    } catch (error) {
      response.error('erro ao deletar');
    }

  }



};