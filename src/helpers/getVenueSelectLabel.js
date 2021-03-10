export default (venue) =>
  venue.name.match(/\sw\s/g) ? venue.name : `${venue.name} (${venue.city})`;
