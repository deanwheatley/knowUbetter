# "Know You" Questions - Default Set

## Overview
Pre-populated questions for new teams. Users answer freeform, system generates quiz questions for teammates.

## Question Flow
1. User sees "Know You" question
2. User types freeform answer
3. User selects 2 wrong answers (system suggests from other users' answers if available)
4. User gets +1 kudos immediately
5. Quiz question auto-generated for team: "What is [User]'s [question]?"
6. Teammates can answer for +10 kudos

## Default Questions (50)

### Personal Preferences (15)
1. What is your favorite color?
2. What is your favorite food?
3. What is your favorite movie?
4. What is your favorite TV show?
5. What is your favorite music genre?
6. What is your favorite book?
7. Coffee or tea?
8. What is your favorite season?
9. What is your favorite holiday?
10. What is your favorite dessert?
11. What is your favorite pizza topping?
12. What is your favorite ice cream flavor?
13. What is your favorite restaurant?
14. What is your favorite sport to watch?
15. What is your favorite animal?

### Work Style (10)
16. What time do you prefer to work? (morning/afternoon/evening)
17. What is your ideal work environment? (quiet/music/collaborative)
18. What is your preferred communication style? (chat/email/video/in-person)
19. How do you take your coffee/tea?
20. What is your go-to productivity tool?
21. What is your favorite day of the week?
22. Do you prefer working from home or office?
23. What is your ideal meeting length?
24. What is your preferred break activity?
25. What motivates you most at work?

### Fun & Hobbies (15)
26. What is your hidden talent?
27. What is your go-to karaoke song?
28. What is your weekend hobby?
29. What is your dream vacation spot?
30. What is your favorite outdoor activity?
31. What is your favorite indoor activity?
32. What is your favorite board game or video game?
33. What is your favorite way to relax?
34. What is your favorite type of music to listen to while working?
35. What is your guilty pleasure TV show?
36. What is your favorite childhood game?
37. What is your favorite way to exercise?
38. What is your favorite social media platform?
39. What is your favorite podcast or YouTube channel?
40. What is your favorite way to spend a rainy day?

### Background & Personality (10)
41. Where did you grow up?
42. What was your first job?
43. What is your favorite childhood memory?
44. What is your biggest pet peeve?
45. What is your superpower if you could have one?
46. What is your spirit animal?
47. What is one thing on your bucket list?
48. What is your favorite quote or motto?
49. What is your proudest accomplishment?
50. If you could have dinner with anyone (living or dead), who would it be?

### Additional Categories (Future Expansion)

#### Food & Drink
- What is your favorite breakfast food?
- What is your favorite snack?
- What is your favorite drink (non-alcoholic)?
- What is your favorite cuisine?
- What is your cooking specialty?

#### Travel & Adventure
- What is your favorite city you've visited?
- What is your dream road trip?
- Beach or mountains?
- What is your favorite travel memory?

#### Entertainment
- What is your favorite genre of movies?
- What is your favorite actor/actress?
- What is your favorite band or artist?
- What is your favorite concert you've attended?

#### Personal Growth
- What is your favorite way to learn new things?
- What is your biggest fear?
- What is your greatest strength?
- What is something you're currently learning?

## System Behavior

### Wrong Answer Generation
When user answers a "Know You" question:
1. System checks if other teammates have answered same question
2. If yes: Suggests their answers as wrong options
3. If no: User must manually enter 2 wrong answers
4. User can always override suggestions and enter custom wrong answers

### Answer Editing
- Users can edit their "Know You" answers anytime
- Editing updates the quiz question for teammates
- Previous answers are archived (not deleted)
- Teammates who already answered see updated question on next attempt

### Category Distribution
- "Know You" questions mixed into quiz flow
- Distribution ratio configurable in admin (e.g., 30% Know You, 70% regular quiz)
- System uses as guideline (may not be enforceable if insufficient questions available)

### Unlimited Answering
- By default, users can answer unlimited "Know You" questions
- Does not count toward weekly question limit
- Configurable in admin (can set weekly limit if desired)
