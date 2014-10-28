#! perl -w

###################################################################################################
# WHO DOES WHAT
# inc_maker_hillsborough.pl              - generates HTML with calls to j_inc files 
# inc_maker_hillsborough_j_incs.pl       - generates the j_inc files
# inc_maker_hillsborough_text_editor.pl  - generates marked up SSI_EDITOR links for the j_inc files
####################################################################################################

###################################################################################################
# This simple script reads data from a tab delimited text file and writes an HTML include file.
# It should be copied to your development machine and run from the command line.

# To set the spreadsheet you want to use and to choose a filename for the HTML you're generating,
# just edit the variables $datasheet, $template and $HTMLfilename at the top of the script.

#                                                                                    Steven Connor
###################################################################################################

use strict;
use warnings;

##########################################################################################
### Initialise some variables to access the files we need. Edit these to suit each job ###

my $datasheet = "hillsborough.txt";
my $HTMLfilename = "hillsborough.inc";
my $jIncPath = '/news/special/2014/newsspec_6762_j_inc/';

##########################################################################################

my $dataPath = '../data';
my $publishPath = '../output';

open (MYOUTPUTFILE, ">".$publishPath."/".$HTMLfilename ) or 
    die "Couldn't open writefile, $publishPath/$HTMLfilename: $!";

my $txt = '<ul id="ns__hillsborough__list" class="ns__hillsborough__list">' . "\n";


my $class;

my ($id_num, $surname, $first_names, $age, $age_range, $sex, $preventable, $verdict, $profile, $story_link, $sources);

# Collect data from tab delimited text file
open (DATASHEET, $dataPath."/".$datasheet) or 
    die "Couldn't open data file, $dataPath/$datasheet: $!";
my $headersRow = <DATASHEET>;

while (<DATASHEET>) {
chomp;

($id_num, $surname, $first_names, $age, $age_range, $sex, $preventable, $verdict, $profile, $story_link, $sources) = split("\t");

    my $filter_classes = '';
    if ($sex eq 'F') {
        $filter_classes .= ' ns__hillsborough--female'
    }
    if ($preventable) {
        $filter_classes .= ' ns__hillsborough--preventable'
    }

    $txt .= "\t" . '<li id="ns__hillsborough--' . ($id_num - 1) . '" class="' .
    $filter_classes . 
    '">' . "\n";
    $txt .= "\t\t" . '<h2 class="ns__hillsborough__name">' . 
        '<!--#include virtual="' . $jIncPath . $id_num . '_name.inc"-->' . 
        '</h2>' . "\n";
    $txt .= "\t\t" . '<span class="ns__hillsborough__age">' . 
        '<!--#include virtual="' . $jIncPath . $id_num . '_age.inc"-->' . 
        '</span>' . "\n";
    $txt .= "\t\t" . '<p class="ns__hillsborough__profile">' . 
        '<!--#include virtual="' . $jIncPath . $id_num . '_profile.inc"-->' . 
        '</p>' . "\n";
    if ($story_link =~ /\w/) {
        $txt .= "\t\t" . '<a class="ns__hillsborough__storylink" href="' . filterString($story_link) . '" target="ns__linkout">Full story (opens in a new browser window)</a>' . "\n";
    }
    $txt .= "\t" . '</li>' . "\n";

}
close (DATASHEET);

$txt .= "" . '</ul>' . "\n";

print MYOUTPUTFILE $txt . "\n\n\n";
print "printed " . $publishPath . "/" . $HTMLfilename . "\n";
exit;
 # use Data::Dumper;
  
  #my $arrSize = @dataArray;
  #print Dumper('array size='.$arrSize);
 #print MYFILE $txt . "\n"; 

#close (MYFILE);




# SUBS #######################

sub fixQuotes {
    my ($string) = @_;

    $string =~ s/^\"(.+)\"$/$1/g; # get rid of unwanted quotation marks
    
    return $string;
}

sub filterString {
    my ($string) = @_;
        $string =~ s/^[\s|\n|\r]*$/$1/g; # get rid of any white space if there are no other characters
        $string =~ s/^\r*(.+)\r*$/$1/g; # get rid of leading or trailing line breaks
        $string =~ s/^\n*(.+)\n*$/$1/g; # get rid of leading or trailing line breaks
        $string =~ s/^\s*(.+)\s*$/$1/g; # get rid of leading or trailing spaces
        $string =~ s/^\t*(.+)\t*$/$1/g; # get rid of leading or trailing spaces
        chomp $string;
        return $string;
}

