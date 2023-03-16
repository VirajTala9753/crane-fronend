import moment from 'moment'

// setTimeout(() => {
//   getRecentTime();
//   console.log("done");
// }, 1000 * 60);
const getRecentTime = () => moment(new Date()).format('LT')

console.log(getRecentTime().substring(0, 5))

export default getRecentTime
