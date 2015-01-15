---
layout: post
title: Scraping HTML tables with Python 3 and HTMLParser
tags: [Python]
---

The [HTMLParser](http://docs.python.org/3/library/html.parser.html)
class within Python's Standard Library provides a reasonable
interface for scraping the content from tables amongst a lot
of extraneous HTML.

Here, I'll show an example of using this to parse tables with
country names from
[NationsOnline](http://www.nationsonline.org/oneworld/countrynames_italian.htm).
A general solution to every variation of table on the website is difficult
due to slight changes in the HTML between pages.
Further, the restriction is applied to not include columns with only
numbers, and to add an option to generate a pickle.

These are both available from
[bamos/simple-python-scripts](https://github.com/bamos/simple-python-scripts).

# Implementation

{% highlight python %}
#!/usr/bin/env python3
#
# ScrapeCountries.py
#
# Scrapes countries from http://www.nationsonline.org
#
# Note: Because the website fluctuates, this is not up to date and
#   tests won't all pass. However, I'm leaving this for the HTMLParser
#   example rather than parsing accuracy.
#
# Brandon Amos
# 2013.04.26

import argparse # Argument parsing.
import html.parser # HTML parsing.
import urllib.parse # URL retrieval.
import urllib.request # URL retrieval.
import re # Regular expressions.
import pickle # Pickling.

# Given a URL, this retrieves the content with a utf8 encoding
# and uses the CountryParser to extract the country names from
# the tables.
class URLParser():
  user_agent = ("Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) "
    "AppleWebKit/525.13 (KHTML,     like Gecko)"
    "Chrome/0.2.149.29 Safari/525.13")

  def __init__(self, url, numCols, extractionMap, exceptions):
    # Request the html.
    request = urllib.request.Request(url)
    request.add_header("User-Agent",self.user_agent)
    try:
      response = urllib.request.urlopen(request)
    except:
      print("Error: Invalid URL. Exiting.")
      exit()
    htmlContent = response.read().decode("utf8")

    # Some files have <br> in the middle of a <td> tag,
    # and cause the parser to misinterpret the data.
    htmlContent = htmlContent.replace("<br>", "")

    # Parse the html.
    parser = CountryParser(numCols, extractionMap, exceptions, strict=False)
    htmlContent = parser.unescape(htmlContent) # Unescape HTML entities.
    parser.feed(htmlContent)
    parser.close()
    self.__countryData = parser.countryData

  @property
  def countryData(self):
    return self.__countryData

# CountryParser keeps track of the HTML tags and appends country
# names to a list.
class CountryParser(html.parser.HTMLParser):

  # Initialize the class variables.
  def __init__(self, numCols, extractionMap, exceptions, strict=False):
    super().__init__(strict=strict)

    self.__numCols = numCols
    self.__extractionMap = extractionMap
    self.__exceptions = exceptions

    # Maintain our position within tags.
    self.__in_tr = False
    self.__in_td = False

    # Within rows specifically, keep track of our index.
    # This helps because we know the country name always
    # occurs in the 0th position, and if we've exceeded
    # `numCols` positions, then the current row does not have
    # the data we want.
    self.__td_position = 0

    # Keep a record of possible data.
    self.__possible_data = []

    # The country names, successfully parsed.
    self.__countryData = []

  def handle_starttag(self, tag, attrs):
    if tag == "tr":
      self.__in_tr = True

      # Reset the possible data.
      self.__td_position = 0
      self.__possible_data = []
      for i in range(self.__numCols):
        self.__possible_data.append("")
    elif tag == "td":
      self.__in_td = True

  def handle_endtag(self, tag):
    if tag == "tr":
      self.__in_tr = False

      if self.__td_position == self.__numCols:
        # Extract the columns and clean them up.
        extractedData = [self.__possible_data[i] for i in self.__extractionMap]
        for i in range(len(extractedData)):
          if extractedData[i]:
            extractedData[i] = extractedData[i].replace('\n', ' ').strip()

        # Detect data with empty columns, unless it's an exception,
        # in which case we don't do this check.
        isIntersection = bool(set(extractedData) & set(self.__exceptions))
        if not isIntersection:
          for i in range(len(extractedData)):
            if not extractedData[i] or len(extractedData[i]) == 0:
              #print(extractedData)
              return

        self.__countryData.append(extractedData)
    elif tag == "td":
      self.__in_td = False
      self.__td_position += 1

  # If our criteria match, we know our position in the table.
  # Keep track of the data.
  def handle_data(self, data):
    if self.__in_tr:
      if self.__in_td:
        if self.__td_position < self.__numCols:
          self.__possible_data[self.__td_position] += data

  @property
  def countryData(self):
    return self.__countryData

# Define usage when running this from the command line.
if __name__ == '__main__':
  parser = argparse.ArgumentParser(
    description='Scrape countries from http://www.nationsonline.org.')
  parser.add_argument('url', type=str, help='The URL to scrape.')
  parser.add_argument('output', type=str, help='The output file.')
  parser.add_argument('-p', '--pickle', dest='p', action='store_true',
      help='Generate a pickle.')
  args = parser.parse_args()

  genPickle = args.p
  url = args.url
  outputFile = args.output

  # Default values.
  numPops = 0 # The number of irrelevant data values at the top to ignore.
  exceptions = [] # Legitimate country rows marked as erroneous.
  numCols = 3 # The number of columns.
  extractionMap = (0, 1, 2) # The subset of columns to use as output.

  # Consider the different cases for each URL.
  baseUrl = ".*nationsonline.org/oneworld/"
  if re.match(baseUrl + "countrynames_arabic.htm", url):
    print("Parsing country names in Arabic.")
    numCols = 5
    extractionMap = (1, 2, 4)
    exceptions = ['Cayman Islands', 'Falkland Islands', 'Montenegro',
        'Saint Kitts and Nevis', 'Saint Vincent and the Grenadines',
        'Tokelau', 'Western Sahara']
  elif re.match(baseUrl + "country_names_in_chinese.htm", url):
    print("Parsing country names in Chinese.")
    numCols = 4
    extractionMap = (0, 1, 2, 3)
    exceptions = ['Tuvalu']
    numPops = 1
  elif re.match(baseUrl + "country_code_list.htm", url):
    print("Parsing country code list.")
    numCols = 5
    extractionMap = (1, 2, 3, 4)
  elif re.match(baseUrl + "countries_of_the_world.htm", url):
    print("Parsing countries of the world.")
    numCols = 5
    extractionMap = (1, 2, 3, 4)
    exceptions = ['Saint Kitts and Nevis',
      'Saint Vincent and the Grenadines', 'Virgin Islands (British)']
  elif re.match(baseUrl + "countrynames_german.htm", url):
    print("Parsing country names in German.")
    exceptions = ['Saint Kitts and Nevis',
      'Saint Vincent and the Grenadines',
      'South Georgia and South Sandwich Islands',
      'Virgin Islands (British)',
      'Western Sahara']
  elif re.match(baseUrl + "countrynames_italian.htm", url):
    print("Parsing country names in Italian.")
    exceptions = ['French Southern Territories',
        'Saint Kitts and Nevis',
        'Saint Vincent and the Grenadines',
        'South Georgia and South Sandwich Islands',
        'U.S. Minor Outlying Islands',
        'Virgin Islands (British)',
        'Western Sahara']
  elif re.match(baseUrl + "countrynames_russian.htm", url):
    print("Parsing country names in Russian.")
    exceptions = ['Saint Kitts and Nevis',
        'Saint Vincent and the Grenadines',
        'Western Sahara']
  elif re.match(baseUrl + "countrynames_spanish.htm", url):
    print("Parsing country names in Spanish.")
    numCols = 5
    extractionMap = (1, 2, 3, 4)
    exceptions = ['Saint Kitts and Nevis',
        'Saint Vincent and the Grenadines',
        'Virgin Islands (British)']
  else:
    print("Unrecognized url. Using default (and likely incorrect) values.")

  print("Using {0} columns overall and extracting columns {1}.".format(
    numCols, extractionMap))

  # Parse the HTML and pop the irrelevant values from the results.
  parsedURL = URLParser(url, numCols, extractionMap, exceptions)
  countryData = parsedURL.countryData
  for i in range(numPops):
    countryData.pop(0)

  # Write the data to disk.
  if genPickle:
    f = open(args.output, 'wb')
    pickle.dump(countryData, f, pickle.HIGHEST_PROTOCOL)
    f.close()
  else:
    f = open(args.output, 'w', encoding="utf8")
    for country in countryData:
      f.write('\t'.join(map(str,country)))
      f.write('\n')
    f.close()
  print("Finished extracting. Data written to '{0}'".format(outputFile))
{% endhighlight %}


# Testing Code
I have also written testing code.
I usually use the
[unittest](http://docs.python.org/3.3/library/unittest.html)
framework to write unit tests for my code.
However, in this case, I don't use any unit testing frameworks
because most of the functionality of the program is based on
command line input.

{% highlight python %}
#!/usr/bin/env python3
#
# ScrapeCountriesTest.py
#
# Note: Because the website fluctuates, this is not up to date and
#   tests won't all pass. However, I'm leaving this for the HTMLParser
#   example rather than parsing accuracy.
#
# Brandon Amos
# 2013.05.01

import os # File removal.
import subprocess # Process creation.
import pickle # Pickling.

baseURL = "http://www.nationsonline.org/oneworld/"
urlDict = dict(
  arabic  = baseURL + "countrynames_arabic.htm",
  chinese = baseURL + "country_names_in_chinese.htm",
  codes   = baseURL + "country_code_list.htm",
  french  = baseURL + "countries_of_the_world.htm",
  german  = baseURL + "countrynames_german.htm",
  italian = baseURL + "countrynames_italian.htm",
  russian = baseURL + "countrynames_russian.htm",
  spanish = baseURL + "countrynames_spanish.htm"
)

# Helper function to count the number of lines in a file handle.
def countLines(fileHandle):
  count = 0
  for line in fileHandle:
    count += 1
  return count

# Helper functions to print sections and subsections.
def section(title):
  print(" + {0}".format(title))
def subsection(title):
  print("   + {0}".format(title))
def subsubsection(title):
  print("     + {0}".format(title))

# Helper function to safely delete a file, if it exists.
def safeDelete(name):
  try:
    os.remove(name)
  except OSError:
    pass

#######
section("Testing Arabic.")
outName = "out-arabic.txt"
command = ["./ScrapeCountries.py", urlDict.get("arabic"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 227, "Incorrect number of lines."

  # 2. Check the content of miscellaneous entries.
  output.seek(0)
  lines = [line.strip() for line in output]
  afghanistan = lines[0].split("\t")
  assert afghanistan[0] == "Afghanistan", "Incorrect content (1)."
  assert afghanistan[1] == "أفغانستان", "Incorrect content (2)."
  assert afghanistan[2] == "Afghanistan", "Incorrect content (3)."

  zimbabwe = lines[226].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (4)."
  assert zimbabwe[1] == "زمبابوي", "Incorrect content (5)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (6)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)

# 3. Test the pickle.
subsection("Testing pickle.")
outName = "out-arabic.pickle"
command = ["./ScrapeCountries.py", "-p", urlDict.get("arabic"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

try:
  f = open(outName, "rb")
  countryData = pickle.load(f)

  afghanistan = countryData[0]
  assert afghanistan[0] == "Afghanistan", "Incorrect content (1)."
  assert afghanistan[1] == "أفغانستان", "Incorrect content (2)."
  assert afghanistan[2] == "Afghanistan", "Incorrect content (3)."

  zimbabwe = countryData[226]
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (4)."
  assert zimbabwe[1] == "زمبابوي", "Incorrect content (5)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (6)."

  subsection("Complete.")
  f.close()
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)

#######
section("Testing Chinese.")
outName = "out-chinese.txt"
command = ["./ScrapeCountries.py", urlDict.get("chinese"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 205, "Incorrect number of lines."

  # 2. Check the content of miscellaneous entries.
  output.seek(0)
  lines = [line.strip() for line in output]

  #    Specifically, check São Tomé and Príncipe because of the
  #    ampersand character codes it originally contains.
  saoTome = lines[161].split("\t")
  assert saoTome[0] == "São Tomé and Príncipe", "Incorrect content (1)."
  assert saoTome[1] == "圣多美普林西比", "Incorrect content (2)."
  assert saoTome[2] == "sheng4 duo1 mei3  pu3 lin2 xi1 bi3", "Incorect content (3)."
  assert saoTome[3] == "São Tomé e Príncipe", "Incorrect content (4)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)


#######
section("Testing country codes.")
outName = "out-codes.txt"
command = ["./ScrapeCountries.py", urlDict.get("codes"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 247, "Incorrect number of lines."

  # 2. Check the content of the last entry.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[246].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content."
  assert zimbabwe[1] == "ZW", "Incorrect content (1)."
  assert zimbabwe[2] == "ZWE", "Incorrect content (2)."
  assert zimbabwe[3] == "716", "Incorrect content (3)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)


#######
section("Testing French.")
outName = "out-french.txt"
command = ["./ScrapeCountries.py", urlDict.get("french"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 237, "Incorrect number of lines."

  # 2. Check the content of miscellaneous entries.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[236].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (1)."
  assert zimbabwe[1] == "Zimbabwe", "Incorrect content (2)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (3)."
  assert zimbabwe[3] == "Eastern Africa", "Incorrect content (4)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)


#######
section("Testing German.")
outName = "out-german.txt"
command = ["./ScrapeCountries.py", urlDict.get("german"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 250, "Incorrect number of lines."

  # 2. Check the content of the last entry.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[249].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (1)."
  assert zimbabwe[1] == "Simbabwe", "Incorrect content (2)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (3)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)

#######
section("Testing Italian.")
outName = "out-italian.txt"
command = ["./ScrapeCountries.py", urlDict.get("italian"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 250, "Incorrect number of lines."

  # 2. Check the content of the last entry.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[249].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (1)."
  assert zimbabwe[1] == "Zimbabwe", "Incorrect content (2)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (3)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)


#######
section("Testing Russian.")
outName = "out-russian.txt"
command = ["./ScrapeCountries.py", urlDict.get("russian"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 227, "Incorrect number of lines."

  # 2. Check the content of the last entry.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[226].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (1)."
  assert zimbabwe[1] == "Зимбабве", "Incorrect content (2)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (3)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)


#######
section("Testing Spanish.")
outName = "out-spanish.txt"
command = ["./ScrapeCountries.py", urlDict.get("spanish"), outName]
try:
  subprocess.call(command, stdout=subprocess.DEVNULL)
except Exception as err:
  subsection("Error: " + str(err))

subsection("Checking output.")
try:
  output = open(outName, encoding="utf8")

  # 1. Check number of lines.
  assert countLines(output) == 237, "Incorrect number of lines."

  # 2. Check the content of the last entry.
  output.seek(0)
  lines = [line.strip() for line in output]

  zimbabwe = lines[236].split("\t")
  assert zimbabwe[0] == "Zimbabwe", "Incorrect content (1)."
  assert zimbabwe[1] == "Zimbabwe", "Incorrect content (2)."
  assert zimbabwe[2] == "Zimbabwe", "Incorrect content (3)."
  assert zimbabwe[3] == "África Oriental", "Incorrect content (4)."

  output.close()
  subsection("Complete.")
except Exception as err:
  subsubsection("Error: " + str(err))
finally:
  safeDelete(outName)

#######
section("Finished testing.")
{% endhighlight %}
