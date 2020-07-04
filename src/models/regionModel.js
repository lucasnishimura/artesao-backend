exports.RegionModel = class RegionModel {
	constructor(connection) {
			this.connection = connection; 
	}

	async getBairros(city,callback) {
		await this.connection.query(`select distinct bairro from artisans where city like '%${city}%'`, callback);
	}
}