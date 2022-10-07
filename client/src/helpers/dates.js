const dates = {
    today: new Date().toLocaleDateString('en-GB'),
    toLocal: (date) => new Date(date).toLocaleDateString('en-GB'),
    toDbFormat: (date) => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
};

module.exports = dates;
