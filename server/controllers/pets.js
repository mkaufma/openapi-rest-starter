function getPets(c, req, res) {
    console.log(`get Pets: c:${c} req:${req} res:${res}`);
    res.status(200).json({result: 'ok'})
}

function getPetById(c, req, res) {
    res.status(200).json({ result: 'ok' });
}

// function notFound(c, req, res) {
//     res.status(404).json({ err: 'not found' });
// }

export default {
    getPets,
    getPetById
};
