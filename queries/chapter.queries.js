const Chapter = require("../database/models/chapter.model");


exports.getChapters = () => {
    return Chapter.find({}).exec()
}

exports.getChapter = (chapterId) => {
    return Chapter.findById(chapterId)
}

exports.deleteChapter = (chapterId) => {
    return Chapter.findOneAndDelete({ _id : chapterId }).exec();
}
exports.createChapter = (chapter) => {
    const newChapter = new Chapter({
        ...chapter,
        active: !!chapter.active
    });
    console.log({newChapter})

    return newChapter.save()
}

exports.searchChapters = (search) => {
    return Chapter.find({ title: new RegExp(search, "i") }).exec();
}