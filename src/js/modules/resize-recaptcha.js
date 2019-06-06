/**
 * Resize ReCaptcha
 * https://github.com/google/recaptcha/issues/61#issuecomment-379366119
 *
 * @author tomanistor, ParmarVjay
 *
 * jQuery to JavaScript
 * @author pedrobritto
 *
 * @version 0.3.0
 */

export default () => {
    function resizeReCaptcha() {
        const recaptchaCollection = [];
        const recaptchas = document.querySelectorAll(".g-recaptcha");

        recaptchas.forEach(item => {
            recaptchaCollection.push({
                recaptchaEl: item,
                recaptchaWidth: item.querySelector("div").offsetWidth,
                recaptchaParentWidth: item.parentElement.offsetWidth,
            });
        });

        recaptchaCollection.forEach(item => {
            if (item.recaptchaParentWidth <= item.recaptchaWidth) {
                const scale = item.recaptchaParentWidth / item.recaptchaWidth;
                item.recaptchaEl.style.transform = "scale(" + scale + ")";
                item.recaptchaEl.style.WebkitTransform = "scale(" + scale + ")";
                item.recaptchaEl.style.transformOrigin = "0 50%";
                item.recaptchaEl.style.WebkitTransformOrigin = "0 50%";
            } else {
                item.recaptchaEl.style.transform = "scale(1)";
                item.recaptchaEl.style.WebkitTransform = "scale(1)";
                item.recaptchaEl.style.transformOrigin = "0 50%";
                item.recaptchaEl.style.WebkitTransformOrigin = "0 50%";
            }
        });
    }

    function checkReCaptchaOnPage() {
        return !!document.querySelector(".g-recaptcha");
    }

    window.addEventListener("load", function() {
        if (checkReCaptchaOnPage()) {
            resizeReCaptcha();
        }
    });

    window.addEventListener("resize", function() {
        if (checkReCaptchaOnPage()) {
            resizeReCaptcha();
        }
    });
};
