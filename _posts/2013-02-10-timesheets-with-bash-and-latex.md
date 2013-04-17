---
layout: post
title: Creating hourly timesheets with Bash and LaTeX
tags: [Bash, LaTeX]
---

As I made the slow transition from Windows to Linux over the past few years,
I've taken a liking to using [LaTeX](http://www.latex-project.org/)
over any of the [WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG)
editors like
LibreOffice. I use [vim](http://www.vim.org/)
to edit documents whenever possible and enjoy
making shell scripts. The usefulness of this is questionable, but
I converted my timesheet in 'doc' format to a combination of a shell
script and LaTeX file. The shell script parses a plaintext file
containing a table of the amount of hours I work and inserts it into
the LaTeX document template.

These files are available on
[GitHub](https://github.com/bamos/simple-shell-scripts/).

#### Usage

Create a file with the days of the week as follows. Also, create
a png file with your signature and put them in the same directory
as the script.

{% highlight text %}
Begin | End   | Sat   | Sun   | Mon   | Tue   | Wed   | Thur  | Fri
02/01   02/01   --      --      --      --      --      --      1.25
02/02   02/08   8.75    5.00    0.50    1.00    1.00    1.50    0.00
02/09   02/15   2.00    3.50    4.50    0.00    0.00    1.50    1.25
{% endhighlight %}

Next, run the script and pass the text file as an argument.

{% highlight text %}
./timesheet.sh 2013.02.01.txt 
Successfully generated and archived timesheet for '2013.02.01'
{% endhighlight %}

The file will be converted to a LaTeX table and the hours are summed.
The pdf of the timesheet is placed in the `Archives` directory.

[See example.](/data/2013-02-10/2013.02.01.pdf)


#### LaTeX Template
`template.tex` is mostly a normal LaTeX document.
The interesting areas to note are:

+ The pay period selection is done by `\Square` and `\XBox`.
+ The table is read from an input file.

The shell script is able to generate the input file and select the
correct pay period based on the calendar.

{% highlight latex %}
\documentclass[letterpaper,12pt]{article}
\pagestyle{empty} % No footer

\usepackage[hmargin=0.50in, vmargin=0.50in]{geometry}
\usepackage{multicol} % Rows spanning multiple columns
\usepackage{wasysym} % Square images
\usepackage[normalem]{ulem} % Colorful links
\usepackage{hyperref, xcolor}  % Colorful links
\usepackage{graphicx} % Figures
\usepackage{tabularx} % newcolumntype

\begin{document}
\begin{center}
WAGE EMPLOYEE TIME SHEET
\end{center}

\hspace{0.5in}Employee Name: \underline{Brandon Amos \hspace{2.5in}}

\vspace{10px}
\hspace{0.5in}ID Number: \hspace{0.25in}
    \underline{1234-56789 \hspace{2.8in}}

\newcommand{\payperiod}[3]{Pay period \##1 \hspace{0.2in} #2 ~ #3\\}
\begin{centering}
\begin{multicols}{2} \noindent
    \payperiod{1~}{12/16 -- 12/31}{\Square}
    \payperiod{2~}{01/01 -- 01/15}{\Square}
    \payperiod{3~}{01/16 -- 01/31}{\Square}
    \payperiod{4~}{02/01 -- 02/15}{\XBox}
    \payperiod{5~}{02/16 -- 02/28}{\Square}
    \payperiod{6~}{03/01 -- 03/15}{\Square}
    \payperiod{7~}{03/16 -- 03/31}{\Square}
    \payperiod{8~}{04/01 -- 04/15}{\Square}
    \payperiod{9~}{04/16 -- 04/30}{\Square}
    \payperiod{10}{05/01 -- 05/15}{\Square}
    \payperiod{11}{05/16 -- 05/31}{\Square}
    \payperiod{12}{06/01 -- 06/15}{\Square}
    \vfill \columnbreak \noindent
    \payperiod{13}{06/16 -- 06/30}{\Square}
    \payperiod{14}{07/01 -- 07/15}{\Square}
    \payperiod{15}{07/16 -- 07/31}{\Square}
    \payperiod{16}{08/01 -- 08/15}{\Square}
    \payperiod{17}{08/16 -- 08/31}{\Square}
    \payperiod{18}{09/01 -- 09/15}{\Square}
    \payperiod{19}{09/16 -- 09/30}{\Square}
    \payperiod{20}{10/01 -- 10/15}{\Square}
    \payperiod{21}{10/16 -- 10/31}{\Square}
    \payperiod{22}{11/01 -- 11/15}{\Square}
    \payperiod{23}{11/16 -- 11/30}{\Square}
    \payperiod{24}{12/01 -- 12/15}{\Square}
\end{multicols}
\end{centering}

YEAR: \underline{2013}

\newcolumntype{C}{>{\centering\arraybackslash} m{9mm} }
\newcolumntype{D}{>{\centering\arraybackslash} m{14mm} }
\newcolumntype{E}{>{\centering\arraybackslash} m{23mm} }
\begin{table}[h]
\center
\begin{tabular}{*{9}{|C}|D|E|E|} \hline
    Begin & End & Sat & Sun & Mon & Tue & Wed & Thur & Fri & TOTAL &
        Signature of & Initials of \\
    Date & Date &&&&&&&&& Employee & Supervisor \\ \hline
    \input{table-contents} 
\end{tabular}
\end{table}

\newcommand{\signature}[2]{
    \underline{#2} \\
    {\it \small #1 Signature \hspace{3in} Date}
}

\vspace{10px}
Hours Certified By:

\vspace{-0.2in} \hspace{1.5in} \includegraphics[scale=0.5]{signature.png}
\begin{center}
    \vspace{-0.48in}
    \signature{Employee}{\hspace{4.6in} \today \hspace{0.3in}}

    \vspace{0.25in}
    \signature{Supervisor}{\hspace{6in}}
\end{center}

\useunder{\uline}{\ulined}{}%
\DeclareUrlCommand{\bulurl}{\def\UrlFont{\it \color{blue}\ulined}}

\vfill
\begin{center} \small
    THIS FORM MUST BE RETURNED NO LATER THAN NOON ON THE $1^{\mathrm{ST}}$
    AND $16^{\mathrm{TH}}$ OF EACH MONTH.

    Time records submitted after these deadlines will not be processed until
    the next pay period.
\end{center}

\vspace{0.1in}
\hfill ENTERED BY \line(1,0){40} \, DATE \line(1,0){40}

\end{document}
{% endhighlight %}

#### Shell Script
The magic is in the shell script `timesheet.sh`.

First, the helper function `die` is defined to echo a message and exit.
{% highlight bash %}
function die { echo $@; exit 1; }
{% endhighlight %}


The script begins by reading the plaintext calendar input as being the
first parameter. Next, the table is created and the appropriate date
box are checked. `pdflatex` is then used to compile the generated
LaTeX file.
The functions `populate_table`, `check_date_box`, and `get_filename`
will be discussed shortly.

{% highlight bash %}
[[ -n $1 ]] || die "Usage: ./timesheet.sh <file>"
cat /dev/null > table-contents.tex

INPUT=$1
populate_table $INPUT
check_date_box

pdflatex -halt-on-error template.tex &> template-compile.log
[[ $? == 0 ]] || die "Latex failed. See the log in template-compile.log."

rm template.aux template-compile.log template.log template.out texput.log \
    &> /dev/null

FILENAME=$(get_filename $INPUT)
PDF=${FILENAME}.pdf
[[ -d Archives ]] || mkdir -p Archives
mv template.pdf Archives/$PDF
mv $INPUT Archives/
{% endhighlight %}

##### Populating the table.

First, use the simple helper function `delimit_days` to delimit 7 arguments
with the first argument.
{% highlight bash %}
function delimit_days { echo "$2 $1 $3 $1 $4 $1 $5 $1 $6 $1 $7 $1 $8"; }
{% endhighlight %}

Next, define the helper functions `_num` and `_elem` to help the parsing.
They accept the hours for a day as a parameter and return 0 or '~'
respectively if the hours matches the regular expression '-+'.
This is the case when 0 should be added to the overall sum, or
an empty space should be inserted into the LaTeX document.

{% highlight bash %}
function _num {
    [[ $1 =~ -+ ]] && echo 0
    [[ ! $1 =~ -+ ]] && echo $1
}

function _elem {
    [[ $1 =~ -+ ]] && echo " ~ "
    [[ ! $1 =~ -+ ]] && echo $1
}
{% endhighlight %}

Next, define a function to parse a single week.
The arguments of the function correspond to the start and end dates
of the week followed by the daily hours. `delimit_days` is used to
first help sum the hours, then to create the LaTeX table.

{% highlight bash %}
function parse_week {
    BEGIN_DATE=$1;  END_DATE=$2;
    [[ $WEEKS == 0 ]] && OVERALL_BEGINNING=$BEGIN_DATE
    M=$3; T=$4; W=$5; TH=$6; F=$7; S=$8; SU=$9
    WEEKLY_HOURS=$(delimit_days " + " $(_num $M) $(_num $T) $(_num $W) \
        $(_num $TH) $(_num $F) $(_num $S) $(_num $SU) | bc)
    TOTAL_HOURS=$(echo "$TOTAL_HOURS + $WEEKLY_HOURS" | bc)

    TABLE_ENTRY="$BEGIN_DATE & $END_DATE & "
    TABLE_ENTRY+=$(delimit_days " & " $(_elem $M) $(_elem $T) $(_elem $W) \
        $(_elem $TH) $(_elem $F) $(_elem $S) $(_elem $SU))
    TABLE_ENTRY+=" & $WEEKLY_HOURS"
    TABLE_ENTRY+=' & \includegraphics[scale=0.3]{signature.png}'
    TABLE_ENTRY+=' & \\[-0.25mm] \hline'
    echo $TABLE_ENTRY >> table-contents.tex
}
{% endhighlight %}

Finally, tie everything together with `populate_table`. Read each line
of the calendar and pass it to the `parse_week` function. Next, add
padding and additional information.

{% highlight bash %}
function populate_table {
    TOTAL_HOURS=0
    WEEKS=0;

    while read LINE; do
        parse_week $LINE
        WEEKS=$((WEEKS+1))
    done <<< "$(tail -n +2 $INPUT)"

    for ((; WEEKS<5; WEEKS++)); do
        echo '&&&&&&&&&&& \\ \hline' >> table-contents.tex
    done

    TOTAL_LINE='\multicolumn{12}{r}{TOTAL HOURS \hspace{0.2in}'
    TOTAL_LINE+="$TOTAL_HOURS"
    TOTAL_LINE+='} \hspace{2.15in}'
    echo $TOTAL_LINE >> table-contents.tex
}
{% endhighlight %}

##### Checking the correct date.
[sed](http://www.grymoire.com/Unix/Sed.html) is used to modify the
LaTeX template directly. First, all boxes are unchecked.
Then, a regex with 3 groups is used to search for line with the
first date in the file. When this is found, the 3rd group corresponding
to the unchecked box, is checked.

{% highlight bash %}
function check_date_box {
    sed -i 's/\\XBox/\\Square/g' template.tex

    REGEX='\(' # Group 1
    REGEX+="$OVERALL_BEGINNING"
    REGEX+='\)'
    REGEX+='\([^{]*}{\)' # Group 2
    REGEX+='\(\\Square\)' # Group 3
    REPLACEMENT='\1\2\\XBox'
    sed -i "s|$REGEX|$REPLACEMENT|g" template.tex
}
{% endhighlight %}

##### Getting the filename.
The technique discussed [here](http://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash)
is used to trim the extension from the filename.

{% highlight bash %}
function get_filename {
    filename=$(basename "$1")
    extension="${filename##*.}"
    filename="${filename%.*}"
    echo $filename
}
{% endhighlight %}

##### Entire script.

{% highlight bash %}
#!/bin/bash
#
# timesheet.sh
# Parses hours from a plaintext file and creates a timesheet in PDF format.
#
# Brandon Amos <http://bamos.github.com/>

function die { echo $@; exit 1; }
function delimit_days { echo "$2 $1 $3 $1 $4 $1 $5 $1 $6 $1 $7 $1 $8"; }
[[ -n $1 ]] || die "Usage: ./timesheet.sh <file>"

function _num {
    [[ $1 =~ -+ ]] && echo 0
    [[ ! $1 =~ -+ ]] && echo $1
}

function _elem {
    [[ $1 =~ -+ ]] && echo " ~ "
    [[ ! $1 =~ -+ ]] && echo $1
}

function parse_week {
    BEGIN_DATE=$1;  END_DATE=$2;
    [[ $WEEKS == 0 ]] && OVERALL_BEGINNING=$BEGIN_DATE
    M=$3; T=$4; W=$5; TH=$6; F=$7; S=$8; SU=$9
    WEEKLY_HOURS=$(delimit_days " + " $(_num $M) $(_num $T) $(_num $W) \
        $(_num $TH) $(_num $F) $(_num $S) $(_num $SU) | bc)
    TOTAL_HOURS=$(echo "$TOTAL_HOURS + $WEEKLY_HOURS" | bc)

    TABLE_ENTRY="$BEGIN_DATE & $END_DATE & "
    TABLE_ENTRY+=$(delimit_days " & " $(_elem $M) $(_elem $T) $(_elem $W) \
        $(_elem $TH) $(_elem $F) $(_elem $S) $(_elem $SU))
    TABLE_ENTRY+=" & $WEEKLY_HOURS"
    TABLE_ENTRY+=' & \includegraphics[scale=0.3]{signature.png}'
    TABLE_ENTRY+=' & \\[-0.25mm] \hline'
    echo $TABLE_ENTRY >> table-contents.tex
}

function populate_table {
    TOTAL_HOURS=0
    WEEKS=0;

    while read LINE; do
        parse_week $LINE
        WEEKS=$((WEEKS+1))
    done <<< "$(tail -n +2 $INPUT)"

    for ((; WEEKS<5; WEEKS++)); do
        echo '&&&&&&&&&&& \\ \hline' >> table-contents.tex
    done

    TOTAL_LINE='\multicolumn{12}{r}{TOTAL HOURS \hspace{0.2in}'
    TOTAL_LINE+="$TOTAL_HOURS"
    TOTAL_LINE+='} \hspace{2.15in}'
    echo $TOTAL_LINE >> table-contents.tex
}

# http://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash
function get_filename {
    filename=$(basename "$1")
    extension="${filename##*.}"
    filename="${filename%.*}"
    echo $filename
}

function check_date_box {
    sed -i 's/\\XBox/\\Square/g' template.tex

    REGEX='\(' # Group 1
    REGEX+="$OVERALL_BEGINNING"
    REGEX+='\)'
    REGEX+='\([^{]*}{\)' # Group 2
    REGEX+='\(\\Square\)' # Group 3
    REPLACEMENT='\1\2\\XBox'
    sed -i "s|$REGEX|$REPLACEMENT|g" template.tex
}

#########
# Start #
#########

cat /dev/null > table-contents.tex

INPUT=$1
populate_table $INPUT
check_date_box

pdflatex -halt-on-error template.tex &> template-compile.log
[[ $? == 0 ]] || die "Latex failed. See the log in template-compile.log."

rm template.aux template-compile.log template.log template.out texput.log \
    &> /dev/null

FILENAME=$(get_filename $INPUT)
PDF=${FILENAME}.pdf
[[ -d Archives ]] || mkdir -p Archives
mv template.pdf Archives/$PDF
mv $INPUT Archives/

echo "Successfully generated and archived timesheet for '$FILENAME'"
{% endhighlight %}
