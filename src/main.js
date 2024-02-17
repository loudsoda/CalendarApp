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

    const current_year      = current_day.getFullYear();
    const current_month     = current_day.getMonth();
    //const current_month     = 10;


    // Get first and last day for populating dates
    const first_day         = new Date(current_year, current_month, 1);
    const last_day          = new Date(current_year, current_month+1, 0).getDate();

    // display current month's name
    const month_name            = month_codes[current_month];
    const month_element         = document.getElementById("month_name_display");
    month_element.textContent   = month_name;


    // get the day the first day falls on
    let current_day_of_week     = first_day.getDay();
    let current_week            = 0;

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

        element.textContent   = String(day);
        current_day_of_week++;

    };

    // Update the previous and next month's days
    const day_container = document.getElementById("day-container");
    const day_con_elements = day_container.querySelectorAll("*");

    for (const element of day_con_elements){
        if (element.textContent == "x"){
            console.log(element.textContent);
            element.classList.add("non-current-month");
        }
    }

};
