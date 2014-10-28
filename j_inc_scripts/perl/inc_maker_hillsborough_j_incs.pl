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

##########################################################################################

my $dataPath = '../data';
my $publishPath = '../output/j_inc';

# Collect data from tab delimited text file
open (DATASHEET, $dataPath."/".$datasheet) or 
    die "Couldn't open data file, $dataPath/$datasheet: $!";
my $headersRow = <DATASHEET>;

while (<DATASHEET>) {
chomp;

    my %rowHash = ();
    my (
            $id_num,
            $surname,
            $first_names,
            $age,
            $age_range,
            $sex,
            $preventable,
            $verdict,
            $profile,
            $story_link,
            $sources,
            $companion1Id,
            $companion1LinkText,
            $companion2Id,
            $companion2LinkText,
            $notes
        ) = split("\t");

    $rowHash{'name'} = $first_names . ' ' . $surname;
    $rowHash{'age'} = $age;
    $rowHash{'profile'} = fixQuotes($profile);

    
    if ($companion1LinkText) {
        my $companionHashRef = {
            'id' => ($companion1Id - 1),
            'linkText' => $companion1LinkText,
        };
        $rowHash{'profile'} = addCompanionLink($rowHash{'profile'}, $companionHashRef);
    }
    
    if ($companion2LinkText) {
        my $companionHashRef = {
            'id' => ($companion2Id - 1),
            'linkText' => $companion2LinkText,
        };
        $rowHash{'profile'} = addCompanionLink($rowHash{'profile'}, $companionHashRef);
    }
    

    for ('name', 'age', 'profile') {
        open (MYOUTPUTFILE, ">" . $publishPath . "/" . $id_num . '_' . $_ . '.inc' ) or 
            die "Couldn't open writefile, $publishPath/$id_num" . '_' . $_ . '.inc' . ": $!";

        print MYOUTPUTFILE $rowHash{$_};
        print "printed " . $publishPath . "/" . $id_num . '_' . $_ . '.inc' . "\n";
    }

}
close (DATASHEET);
exit;




# SUBS #######################

sub fixQuotes {
    my ($string) = @_;

    $string =~ s/^\"(.+)\"$/$1/g; # get rid of unwanted quotation marks
    
    return $string;
}

sub addCompanionLink {
    my ($profileText, $companionHashRef) = @_;

    my $newProfileText = $profileText;

    # wrap a link around matched text
    $newProfileText =~ s/($companionHashRef->{'linkText'})/<a class="ns__hillsborough__link--companion" href="#ns__hillsborough--$companionHashRef->{'id'}">$1<\/a>/sg;
    
    return $newProfileText;
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

