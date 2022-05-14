require('dotenv').config()
const Fixtures = require('node-mongodb-fixtures');
const path = require('path');

module.exports = async () => {
    const fixtures = new Fixtures(
        {
            dir: path.resolve(__dirname, './entities'),
            mute: true,
            filter: 'users.*',
        }
    );
    await fixtures.connect(process.env.URL_MONGO).then(() => fixtures.load());
    const users = await Promise.resolve(fixtures._db.collection('apinode'))
        .then((collection) => {
            return collection.find().toArray();
        });
    const cleanup = () => fixtures.unload().then(() => fixtures.disconnect());
    return {cleanup, entities: users};
}
