# SGPA Calculator - Vignan University

This is a simple web-based SGPA (Semester Grade Point Average) calculator designed for Vignan University students. It allows users to input their course details (credits and grade points) and calculates their SGPA based on the formula:

# SGPA Calculation

The SGPA (Semester Grade Point Average) is calculated using the formula:

$$
SGPA = \frac{\sum_{i=1}^{n} (C_i \times P_i)}{\sum_{i=1}^{n} C_i}
$$

Where:
- \( C_i \) = Credits for the \( i^{th} \) course
- \( P_i \) = Grade points for the \( i^{th} \) course

The calculator also provides the option to toggle between light and dark themes.

## Features
- Input credits and grade points for each course.
- Add or remove courses dynamically.
- Calculates SGPA based on entered data.
- Light and dark mode toggle for better accessibility.
- Responsive design for better user experience.

## Usage

1. Enter the course credits and grade points in the input fields.
2. Click "Add Course" to add more courses.
3. After entering all your courses, click "Calculate SGPA" to get your SGPA.
4. The result will appear below the input fields.

> **Note:** Courses with only 1 credit should not be included in the SGPA calculation as they are not factored into the final SGPA.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- MathJax for rendering the SGPA formula
- FontAwesome for icons

## Contributions

Contributions are welcome! Feel free to fork this project, submit issues, or open pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgments
- Thanks to Vignan University for providing inspiration for this project.
- Thanks to FontAwesome for the icons used in the UI.
