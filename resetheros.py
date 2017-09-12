import os
for filename in os.listdir('resources/pics'):
    f = open('main.css', 'a+')
    f.write ('\n#' + os.path.splitext(filename)[0] + '{background-image:url("resources/pics/' + os.path.splitext(filename)[0] + '.png");}')
    f.close()
for filename in os.listdir('resources/pics'):
    file = 'heroPages/' + os.path.splitext(filename)[0] + '.html'
    f = open(file, 'w+')
    f.write (open('resources/other/TEMPLATE.html').read().format(os.path.splitext(filename)[0]))
    f.close()
