var config = {

    multer_options: {
        dest        :'/tmp/uploads',
        rename      : function (fieldname, filename) {
            return Date.now() + '-' + filename.replace(/\W+/g, '-').toLowerCase();
        }
    }
};
exports.config = config;