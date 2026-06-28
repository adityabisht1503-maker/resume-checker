const transaction = async (req, res, next) => {
  try {
    const { transactionId } = req.body;

    req.user.transactionId = transactionId;
    await req.user.save();

    next(); // pass req.user forward
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Transaction save failed",
    });
  }
};

module.exports = { transaction };
