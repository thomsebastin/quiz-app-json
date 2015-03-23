(function() {
    $.getJSON("json/data.json", function(data) {
        var myData = data; //response stored in myData. myData holds an array now.
        var arrayLength = myData.length - 1; //grabbed length of an array
        var i = 0;
        var myArray = [];
        var currentObj = myData.indexOf(myData[i]);
        var answersLen = myData[i].options.length; //we have four here
        var quesNum = document.querySelector("#quesNum"); //displays question number
        quesNum.innerText = "Question " + currentObj + " of " + arrayLength;
        var realQues = document.querySelector("#realQues"); //displays question from the array
        realQues.innerText = myData[i].text;
        var choice = document.querySelector("#yourChoice"); //displays answers from the option 
        for (var n = 0; n < answersLen; n++) {
            choice.innerHTML += '<li>' + myData[i].options[n] + '</li>';
        }
        i++;
        $(".selectBtn").on('click', function() {
            // pushing each answers value to an array
            myArray.push(parseInt($(this)[0].value) - 1);
            console.log(myArray);
            choice.innerHTML = "";
            realQues.innerText = "";
            quesNum.innerText = "You finished all the questions ;)";
            if (i <= arrayLength) {
                currentObj = myData.indexOf(myData[i]);
                quesNum.innerText = "Question " + currentObj + " of " + arrayLength;
                realQues.innerText = myData[i].text;
                // looping for answers
                answersLen = myData[i].options.length; //we have four here

                for (var n = 0; n < answersLen; n++) {
                    choice.innerHTML += '<li>' + myData[i].options[n] + '</li>';
                }
                i++;
            } else {
                choice.innerHTML = "Thank you for taking the quiz!!"
                $(".selectBtn").css("display", "none");
                $(".result").css("display", "block");
            }
        });
        $(".result").click(function() {
            var correctAns = [];
            var wrongAns = [];
            for (i = 0; i < myArray.length; i++) {
                if (myArray[i] === myData[i].answer) {
                    correctAns.push(myArray[i]);
                } else {
                    wrongAns.push(myArray[i]);
                }
            }
            choice.innerHTML = "You got " + correctAns.length + " correct answers <br>";
            quesNum.innerText = "";
            choice.innerText += wrongAns.length + " of your answers were wrong";
        });
    });
})();
