import root from 'app-root-path';
import _ from 'lodash';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 7001;

let base = {
    env,
    root,
    port: DEFAULT_PORT
};

let defaultConf;
let envConf;
try {
    defaultConf = require('./default.json');
    envConf = require(`./${env}.json`);
} catch (ex) {
}

if (!defaultConf) {
    console.log('Cannot find default.json configuration file');
}
if (!envConf) {
    console.log(`Cannot find ${env}.json configuration file`);
}

base = _.merge(base, defaultConf);
base = _.merge(base, envConf);
global.appConfig = _.cloneDeep(base);
export default base;
