const mongo = require("../schemas");
const core = require("../core");

const createPoll = ({question, userId}) => {
    return mongo.Poll.insert({
        question,
        userId
    })
}

const addOptions = ({options, pollId, userId}) => {
    let poll = mongo.Poll.count({
        _id: pollId,
        userId
    })
    if(!poll){
        return false;
    }
    let uniqueOptions = options.filter((item, i, ar) => ar.indexOf(item) === i); 
    let insData = [];
    for(option of uniqueOptions){
        option = option.trim();
        if(!option) continue;
        insData.push({
            option,
            pollId,
            userId
        });
    }

    return mongo.PollOption.insertMany(insData);
}

const removeOption = (id, userId) => {
    return mongo.PollOption.delete({
        _id: id,
        userId
    })
}

const createPollWithOptions = async ({question, userId, options}) => {
    const poll = await createPoll({question, userId});
    return addOptions({options, pollId: poll._id, userId});    
}

const deletePoll = async ({pollId, userId}) => {
    let poll = mongo.Poll.findOne({
        _id: pollId,
        userId: userId
    });
    if(!poll){
        return false;
    }

    await mongo.Poll.delete({
        _id: pollId
    });
    await mongo.PollOption.deleteAll({
        pollId: pollId
    });
    return true;
}

const getPolls = (page = 1) => {
    let limit = 10;
    let skip = (page-1) * 10;

    return mongo.Poll.findAllWithEx(
        {}, 
        'question _id', 
        {_id: 'DESC'},
        limit,
        skip
    );
}

const getOptions = (pollId) => {
    return mongo.PollOption.findAllWithEx(
        {pollId}, 
        'option vote', 
        {_id: 'ASC'}
    );
}

const vote = async ({userId, pollId, optionId}) => {
    let prevVote = await mongo.Vote.findOne({
        userId,
        pollId
    });
    if(prevVote){
        // if(optionId == prevVote.optionId) return;
        await mongo.Vote.delete({
            userId,
            pollId,
            optionId: prevVote.optionId
        });
        await mongo.PollOption.update({
            _id: prevVote.optionId
        }, {}, {
            $inc: {
                vote: -1
            }
        })
    }

    await mongo.Vote.insert({
        userId,
        pollId,
        optionId
    });
    await mongo.PollOption.update({
        _id: optionId
    }, {}, {
        $inc: {
            vote: 1
        }
    });
    return;
}

module.exports = {
    createPoll,
    createPollWithOptions,
    deletePoll,
    addOptions,
    getOptions,
    removeOption,
    getPolls,
    vote
}