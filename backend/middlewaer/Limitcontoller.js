const DAILY_LIMIT = 2;

const Limitcontroller = async (req, res, next) => {
  try {
    const user = req.user;
    

    const now = new Date();
    const last = user.lastResetDate || now;

    if(user.Plan === "Pro"){
       user.analysisCount = 0;
    }

    const isNewDay =
      now.getFullYear() !== last.getFullYear() ||
      now.getMonth() !== last.getMonth() ||
      now.getDate() !== last.getDate();

    if (isNewDay) {
      user.analysisCount = 0;
      user.lastResetDate = now;
      await user.save();
    }

    if (user.analysisCount >= DAILY_LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Daily analysis limit reached. Try again tomorrow."
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Usage limit check failed"
    });
  }
};

module.exports = { Limitcontroller };
