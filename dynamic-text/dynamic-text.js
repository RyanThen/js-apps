// Get dynamic html text containers
const courseInfoTextContainer = document.querySelectorAll('.dynamic-text-container');

const now = new Date();

// Create array of future courses based on number of HTML dynamic text containers
const futureCourses = [];

courseInfoTextContainer.forEach(function(el, index) {
  futureCourses.push(eval('courseInfo' + (index + 1)).filter(course => now < course.courseDate1));
})

// Days and months variables
const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

// Update page content with dynamic text
const updateCourseInfoText = function(array, htmlContainer) {  
  array.forEach((nextCourse, index) => {

    // Set limit for number of entries if more than one line of text
    if (index > 0) return;

    const markup = `
      <span>
        Este taller se dictará 
        ${nextCourse.courseDate2 ? 'los días' : 'el día'}

        ${dayNames[nextCourse.courseDate1.getDay()]}
        ${nextCourse.courseDate1.getDate()} 
        ${nextCourse.courseDate2 && nextCourse.courseDate1.getMonth() !== nextCourse.courseDate2.getMonth() ? monthNames[nextCourse.courseDate1.getMonth()] : ''} 

        ${nextCourse.courseDate2 ? ' y ' + dayNames[nextCourse.courseDate2.getDay()] : ''}
        ${nextCourse.courseDate2 ? nextCourse.courseDate2.getDate() : ''}
        ${nextCourse.courseDate2 ? monthNames[nextCourse.courseDate2.getMonth()] : monthNames[nextCourse.courseDate1.getMonth()]}

        de 
        ${nextCourse.time}.
      </span>
    `; 

    // Inject markup onto page
    htmlContainer.innerHTML = markup;

  });

};

// Run updateCourseInfoText() to inject course data onto web page text
courseInfoTextContainer.forEach(function(textContainer, index) {
  updateCourseInfoText(futureCourses[index], courseInfoTextContainer[index])
});