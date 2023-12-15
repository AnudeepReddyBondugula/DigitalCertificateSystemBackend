const issueCertificateHandler = async (req, res) => {
    try{

    } catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        })
        console.error("Error in DigiLockerHandler");
        console.error(err);
    }
}

module.exports = {issueCertificateHandler}