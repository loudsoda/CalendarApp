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

    const current_year          = current_day.getFullYear();
    const current_day_of_month    = current_day.getDate();
    //const current_month     = 10;


    // Get Month information and update month name element
    const current_month         = current_day.getMonth();
    const month_name            = month_codes[current_month];
    const month_element         = document.getElementById("month_name_display");
    month_element.textContent   = month_name;


    // Get first and last day for populating dates
    const first_day         = new Date(current_year, current_month, 1);
    const last_day          = new Date(current_year, current_month+1, 0).getDate();
    let current_day_of_week     = first_day.getDay();
    let current_week            = 0;

    // Calculate what the previous month was
    // if the month is january, set the previous month to december
    if (current_month == 0){
        let previous_month = 11 
    }

    else{
        let previous_month  = current_month - 1;
    }

    let previous_month_last_day = new Date(current_year, current_month-1, 0).getDate();
    console.log(previous_month_last_day)
    

    // Calculate what the next month
    // if the month is decemeber, roll over to january
    if (current_month == 11){
        let next_month = 0
    }

    else{
        let next_month  = current_month + 1;
    }
    



    // Populate current month's information
    for (let day = 1; day <= last_day; day++){
        
        // shift the week over when the day is sunday aka day of the week is 7
        if (current_day_of_week == 7){
            current_week++;
            current_day_of_week = 0;
        }
        
        // update day elements
        let calendar_code = String(current_week) + String(current_day_of_week);
        let element       = document.getElementById(calendar_code);
        
        
        element.classList.add("current-month")

        if(day == current_day_of_month){
            element.classList.add("current-day")
        }

        else if(day <= current_day_of_month){
            element.classList.add("past-day")
        }

        element.textContent   = String(day);
        current_day_of_week++;

    };

    // Update the previous and next month's days
    const day_container = document.getElementById("day-container");
    const day_con_elements = day_container.querySelectorAll("*");
    
    // Last month
    for(let i = day_con_elements.length - 1; i >=0; i--){
        if (day_con_elements[i].textContent == "x" && day_con_elements[i].id.includes("0")){

            day_con_elements[i].textContent = previous_month_last_day
            day_con_elements[i].classList.add("non-current-month");
            previous_month_last_day -= 1
        }
        
    }
    let next_month_day = 1
    for(let i in day_con_elements){
        let element = day_con_elements[i]
        if (element.textContent == "x"){
            console.log(element)
            element.textContent = next_month_day
            element.classList.add("non-current-month");
            next_month_day += 1
        }
        
    }

};
