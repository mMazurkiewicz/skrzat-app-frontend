import HOCFormActions from '../../abstr/HOCForm/HOCFormActions';
import { prefix } from './eventsFormReducer';

export class EventsFormActions extends HOCFormActions {}

const actions = new EventsFormActions({ prefix });

export default actions;
