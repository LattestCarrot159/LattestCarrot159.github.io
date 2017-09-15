import os
for filename in os.listdir('resources/pics'):
    f = open('main.css')
    if '#' + os.path.splitext(filename)[0] + '{background-image:url("resources/pics/' + os.path.splitext(filename)[0] + '.png");}' not in f.read():
        f.close()
        f = open('main.css', 'a')
        f.write ('\n#' + os.path.splitext(filename)[0] + '{background-image:url("resources/pics/' + os.path.splitext(filename)[0] + '.png");}')
        f.close()
    else:
        f.close()
    file = 'heroPages/' + os.path.splitext(filename)[0] + '.html'
    fi = open(file, 'w+')
    fi.write (open('resources/other/TEMPLATE.html').read().format(os.path.splitext(filename)[0]))
    fi.close()
