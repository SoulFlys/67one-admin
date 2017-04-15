export const formatDate = (time) => {
    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
        month = String(month).length === 1 ? "0" + month : month;
    let date = new Date(time).getDate();
        date = String(date).length === 1 ? "0" + date : date;
    let hour = new Date(time).getHours();
        hour = String(hour).length === 1 ? "0" + hour : hour;
    let minute = new Date(time).getMinutes();
        minute = String(minute).length === 1 ? "0" + minute : minute;
    let second = new Date(time).getSeconds();
        second = String(second).length === 1 ? "0" + second : second;
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
};
