import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const { window } = new JSDOM('');
const { document } = new JSDOM('').window;

global.window = window;
global.document = document;
