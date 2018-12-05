import config from './config';
import app from './server/app';

console.log(`Environment: ${config.env}`);
const PORT = global.appConfig.port || 7001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
