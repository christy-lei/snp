// This is a simple IB demo experiment, feel free to edit or delete it
// Participants will first perform a simple line judgement task (4 trials) and an unexpcted shape will appear on the 5th critical trial

PennController.ResetPrefix(null) // Shorten command names (always keep this line here at the beginning of your experiment)

// Use Sequence to arrange the block orders. Show the 'intro' block first, then the 'experiment' block and the 'followup' question block,
// then send the results and finally show the 'bye' screen
Sequence("intro",  "experiment", "followup",  SendResults() , "bye" )

newTrial("intro",   // always name your block in the 1st parameter afrer newTrial (e.g. "intro")
                    // the first block includes your experimental instruction (I used many newText elements and html tags to create spaces between my texts)
                    
    newText("<p>Welcome to the experiment!</p>") 
        .css("font-size", "20px")   // use .css command to adjust the aesthetics (e.g. "font-size", "color", "font-family", etc)
        .center()       // this command horizontally centers your stimulus
        .print()        // make the text visible on the screen
        
    , // use a comma to separate elements
    
    newText("In each trial, a cross will be briefly presented on the screen. Your task is to <b>judge which arm of the cross is longer</b>.")
        .css("font-size", "20px")
        .center()
        .print()
    ,
    
    newText("<p>Press F if the horizontal arm is longer. Press J if the vertical arm is longer. </p>")
        .css("font-size", "20px")
        .center()
        .print()
    ,
    
    newText("<p>Press F or J to start the experiment<p/>")
        .css("font-size", "20px")
        .center()
        .print()
    ,
    
    newKey("FJ")    // create a key element to specify "F" and "J" as two available keys for responding
        .wait()     // use this command so PCIBEX will "wait" until a response has been made
    
    ).setOption("hideProgressBar", true) // hide the default progress bar
    
    
Template("myTable.csv", // specifiy the name of the csv table
    row =>  // create a variable and name it (e.g. row); the variable will iteratively point to every row in the csv table you just specified above
    
    newTrial("experiment",   // create a newTrial environment and name it (e.g "experiment"); this part contains the fixed/repetitive trial structure
        newText("fix", "+")  // create a fixation cross
            .css("font-size", "60px")
            .print("center at 50%", "center at 50%")    // specify the percentages to print it at the very center of your screen
         ,
        
         newTimer(500)  // use the newTimer element and its associated commands (start and wait) to present the fixation for 500ms
            .start()
            .wait()
        ,
    
         getText("fix") // refer back to the fixation element and remove it
            .remove()
        ,
    
         newImage("cross", row.Filename)    // present the first cross image used in the line judgement task 
            .print("center at 50%", "center at 50%")    //(row.Filename specifies the filename in your csv table)
            
        ,
    
         newTimer(200) // present this cross image for 200ms
            .start()
            .wait()
        ,
    
        getImage("cross")   // remove the cross image
            .remove()
        ,
    
        newImage("mask", "mask.png")    // present a mask after the cross
            .print("center at 50%", "center at 50%")
        ,
   
        newTimer(100)  // present the mask for 100ms
            .start()
            .wait()
        ,
        getImage("mask")    // remove the mask
            .remove()
        ,
    
        newText("Please respond. <p> F - horizontal is longer, J - vertical is longer </p>")   // ask participants to respond every trial after the mask 
            .css("font-size", "20px")
            .center()
            .print()
    
        ,
        newKey("FJ")    // create "F" and "J" as keys for responding
            .wait()
            .log()  // use log to keep track of the response

    )
    .setOption("hideProgressBar", true)
    .log("Type", row.Type)      // this will create a column "Type" in your results file to store what's the trial type (e.g. cross, or critical)
                                // again, check the csv table if you forget what's under the Type column
)

newTrial("followup",
    newText("Did you notice something else in the last trial? ")
        .css("font-size", "20px")
        .center()
        .print()
    ,
    newScale("notice",  "yes", "<p>no<p/>")
        .css("font-size", "20px")
        .center()
        .print()
        .log()  // use log to keep track of the response
    ,
    
     newText("If so, what's the shape of the thing you noticed?")
        .css("font-size", "20px")
        .center()
        .print()
    ,
    newScale("shape",  "square", "<p>circle<p/>", "<p>I don't know!<p/>")
        .css("font-size", "20px")
        .center()
        .print()
        .log()  // use log to keep track of the response
    ,
    
    newButton("click to finish")    // create a button element 
        .css("font-size", "15px")
        .center()
        .print("center at 50%", "center at 50%")
        .wait()
   
    ).setOption("hideProgressBar", true)



newTrial( "bye" ,
    newText("Thank you for your participation!")    // create a thank you screen
        .print()
        ,
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
    )
    .setOption("hideProgressBar", true)
    
    
DebugOff() // turn off the debugger (ONLY USE THIS LINE WHEN YOU'RE READY TO PUBLISH YOUR STUDY!)


// OTHER NOTES:
// Spaces and linebreaks don't matter to the script: we've only been using them for the sake of readability

// the csv file contains two columns: Type and Filename
// "Type" specifies whether the trial is a line judgement task (easy or difficult) or a critical trial (that contains the unexpected stim)
// "Filename" contains the exact filenames of the image stimuli to be used in your experiment (uploaded in the Resources folder already)
