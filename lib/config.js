var config = {

    multer_options: {
        dest        :'./public/uploads',
        rename      : function (fieldname, filename) {
            return Date.now() + '-' + filename.replace(/\W+/g, '-').toLowerCase();
        }
    }
};
exports.config = config;