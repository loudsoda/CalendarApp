week_codes = {
    0:  "Mon",
    1:  "Tue",
    2:  "Wed",
    3:  "Thu",
    4:  "Fri",
    5:  "Sat",
    6:  "Sun"
};

window.onload = function () {

    // make day object
    const current_day       = new Date();
    let current_year_now    = current_day.getFullYear();
    let current_day_now     = current_day.getDate();
    let year_month_now      = String(current_day.getMonth()) +"_"+ String(current_year_now);

;

    function updateMonthElement(month_index){
        // Upddate the month element
        
        month_codes = {
            0:  "Jan",
            1:  "Feb",
            2:  "Mar",
            3:  "Apr",
            4:  "May",
            5:  "Jun",
            6:  "Jul",
            7:  "Aug",
            8:  "Sep",
            9:  "Oct",
            10: "Nov",
            11: "Dec"
        };

        const month_name            = month_codes[month_index];
        const month_element         = document.getElementById("month_name_display");
        month_element.textContent   = month_name;

        return month_index;

    }


    function caclulatePreviousMonthLastDay(current_month){
        // Calculate what the last day of the previous month was
        
        let previous_month = current_month - 1;

        // if the month is january, set the previous month to december
        if (current_month == 0){
            previous_month = 11;
        }

        else{
            previous_month  = current_month - 1;
        }

        return new Date(current_year_now, previous_month, 0).getDate();
    

    }
    

    function caclulateNextMonth(current_month){
        // Calculate what the next month is 

        let next_month;

        // If the month is decemeber, roll over to january
        if (current_month == 11){
            next_month = 0;
        }

        else{
            next_month  = current_month + 1;
        }

        return next_month;
    }




    function populateDisplayMonth(display_year, display_month){
        
        // Get Month information and update month name element
        let current_month           = updateMonthElement(display_month);
        
        let previous_month_last_day = caclulatePreviousMonthLastDay(current_month);
        let next_month              = caclulateNextMonth(current_month);
        
        // Get first and last day for populating dates
        let first_day         = new Date(current_year_now, current_month, 1);
        let last_day          = new Date(current_year_now, current_month+1, 0).getDate();
        
        // Get the day which the first day lands on
        let day_date    = first_day.getDay();
        let week_count              = 0;

        let year_month_display      = String(display_month) +"_"+ String(display_year);
        let calendar_code = String(week_count) + String(day_date);
        let is_display_and_now = year_month_now == year_month_display;

        console.log(calendar_code);

        // Begin populating the calandar starting with the first day of the month
        // Populate current month's information

        // loop through all the valid days within the display month
        for (let day = 1; day <= last_day; day++){
            // Check if the day is sunday aka day of the week is 7. If so, shift the week over
            if (day_date == 7){
                week_count++;
                day_date = 0;
            }
            
            // update day elements
            calendar_code = String(week_count) + String(day_date);
            let element       = document.getElementById(calendar_code)

            // Clean out css classes when the month is changed  
            element.className = "";  
            
            if (element.textContent != "x"){
                element.textContent = "x";
            }
                       // Remove all classes
            element.classList.add("grid-item"); 

            // Added date to the current mont class
            element.classList.add("current-month");

            // Designate the current day
        
            if (is_display_and_now){
                if(day == current_day_now){
                    element.classList.add("current-day");
                }
                
                // Designate past dates
                else if(day <= current_day_now){
                    element.classList.add("past-day");
                }
            }

            else{
                element.classList.add("past-day");
            }

            // Update date button
            element.textContent   = String(day);
            day_date++;
            
        }
        let next_month_day = 1
        let next_month_day_start = Number(calendar_code[1])+1;

        for(let week = calendar_code[0]; week < 6; week ++){
            
            for(let day = next_month_day_start; day < 7; day++){
                console.log(day);
                element = document.getElementById(String(week) + String(day))
                element.textContent = next_month_day
                element.classList.add("non-current-month");
                next_month_day += 1;
            }
            next_month_day_start = 0
        }
    
        /*
        // Update the previous and next month's days
        const day_container = document.getElementById("day-container");
        const day_con_elements = day_container.querySelectorAll("*");
        
        // Last month
        for(let i = day_con_elements.length - 1; i >=0; i--){
            if (day_con_elements[i].textContent == "x" && day_con_elements[i].id[0].includes("0")){
    
                day_con_elements[i].textContent = previous_month_last_day
                day_con_elements[i].classList.add("non-current-month");
                previous_month_last_day -= 1
            }
        }
        
        let next_month_day = 1
        for(let i in day_con_elements){
            let element = day_con_elements[i]
            if (element.textContent == "x"){
                element.textContent = next_month_day
                element.classList.add("non-current-month");
                next_month_day += 1
            }
            
        }
        */
    }

    // Get Month information and update month name element
    let current_month           = updateMonthElement(current_day.getMonth());

    populateDisplayMonth(current_year_now, current_month)
    //---------------------------
    // Buttons
    //---------------------------
    let back_btn = document.getElementById("back-btn");

    back_btn.addEventListener("click", function(){
        
        current_month -= 1;

        if (current_month < 0){
            current_month = 11;
            current_year_now -= 1;
        }
        populateDisplayMonth(current_year_now, current_month);
    })


};
