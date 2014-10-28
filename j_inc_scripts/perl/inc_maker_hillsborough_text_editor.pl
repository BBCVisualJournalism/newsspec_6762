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
my $HTMLfilename = "text_files_main.inc";

##########################################################################################

my $dataPath = '../data';
my $publishPath = '../output/j_inc';
my $appUrl = 'http://specials.newsonline.tc.nca.bbc.co.uk/cgi-bin/SSIEditor/SSIEditor.pl?method=edit&path=//nolmcs01/inetpub/wwwlive/news/special/2014/newsspec_6762_j_inc/';

open (MYOUTPUTFILE, ">".$publishPath."/".$HTMLfilename ) or 
    die "Couldn't open writefile, $publishPath/$HTMLfilename: $!";

my $txt = '';


my $class;

my ($id_num, $surname, $first_names, $age, $age_range, $sex, $preventable, $verdict, $profile, $story_link, $sources);

# Collect data from tab delimited text file
open (DATASHEET, $dataPath."/".$datasheet) or 
    die "Couldn't open data file, $dataPath/$datasheet: $!";
my $headersRow = <DATASHEET>;

while (<DATASHEET>) {
    chomp;

    ($id_num, $surname, $first_names, $age, $age_range, $sex, $preventable, $verdict, $profile, $story_link, $sources) = split("\t");


    $txt .= "\t" . '<p>' . "\n";
    $txt .= "\t\t" . '<h2>' . $first_names . ' ' . $surname . "</h2>\n";
    $txt .= "\t\t" . '<span class="smallbody">Name</span><br/>' . "\n";
    $txt .= "\t\t" . '<a href="' . $appUrl . $id_num . '_name.inc" target="work_area"> - <b>Click here to edit the text</b></a><br/>' . "\n";
    $txt .= "\t" . '</p>' . "\n\n";

    $txt .= "\t" . '<p>' . "\n";
    $txt .= "\t\t" . '<span class="smallbody">Age</span><br/>' . "\n";
    $txt .= "\t\t" . '<a href="' . $appUrl . $id_num . '_age.inc" target="work_area"> - <b>Click here to edit the text</b></a><br/>' . "\n";
    $txt .= "\t" . '</p>' . "\n\n";

    $txt .= "\t" . '<p>' . "\n";
    $txt .= "\t\t" . '<span class="smallbody">Profile</span><br/>' . "\n";
    $txt .= "\t\t" . '<a href="' . $appUrl . $id_num . '_profile.inc" target="work_area"> - <b>Click here to edit the text</b></a><br/>' . "\n";
    $txt .= "\t" . '</p>' . "\n\n";
    $txt .= "\t" . '<hr />' . "\n\n";

}
close (DATASHEET);

print MYOUTPUTFILE $txt . "\n\n\n";
print "printed " . $publishPath . "/" . $HTMLfilename . "\n";
exit;




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

