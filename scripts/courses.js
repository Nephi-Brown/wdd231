document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModifiedDate();
    renderCourses();
  });
  
  // Course data
  const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming...',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web...',
      technology: ['HTML', 'CSS'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized...',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes and objects...',
      technology: ['C#'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience in Web Fundamentals...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience with Dynamic Web...',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: false
    }
  ];
  
  function renderCourses(filter = 'All') {
    const container = document.getElementById("courses-container");
    container.innerHTML = '';
  
    const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.subject === filter);
  
    filteredCourses.forEach(course => {
      const courseBtn = document.createElement("button");
      courseBtn.classList.add("course-btn");
      if (course.completed) {
        courseBtn.classList.add("completed");
      }
      courseBtn.textContent = `${course.subject} ${course.number}`;
      courseBtn.title = `${course.title} (${course.credits} credits)\n${course.description}\nTech: ${course.technology.join(", ")}`;
      container.appendChild(courseBtn);
    });
  
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
  }
  
  document.getElementById("all-btn").addEventListener("click", () => renderCourses('All'));
  document.getElementById("cse-btn").addEventListener("click", () => renderCourses('CSE'));
  document.getElementById("wdd-btn").addEventListener("click", () => renderCourses('WDD'));
  
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
