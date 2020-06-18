import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';

export const differenceInDays = (date) =>
  !!date && differenceInCalendarDays(new Date(), parseISO(date));

export const differenceInMonths = (date) =>
  !!date && differenceInCalendarMonths(new Date(), parseISO(date));

export const parseDate = (date) =>
  !!date && format(new Date(date), 'dd/MM/yyyy');

export default {
  differenceInDays,
  differenceInMonths,
};
